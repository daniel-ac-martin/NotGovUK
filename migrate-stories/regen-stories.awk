function env() {
  printf "Story = %s, Total stories = %d\n", storyName, length(storyName)
}

BEGIN {}

/<Preview withToolbar>/ { inPrimary = 1 }
/<\/Preview>/           { inPrimary = 0 }

# match($0, /<Story name="(.*)">/, grp) { storyName = inPrimary ? "Primary" : grp[1]; env() }
/<Story name="(.*)">/ { storyName = inPrimary ? "Primary" : grp[1]; env() }

/<\/Story>/ {
  stories[storyName] = 1
  storyName = "";
  env()
}

// { print "CATCHALL"; }

END {
  print "Hello"
}
