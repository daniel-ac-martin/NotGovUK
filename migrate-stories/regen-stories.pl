#!/bin/env perl

use strict;
use warnings;

use JSON qw(to_json);

# $, = ' ';  # set output field separator
# $\ = "\n"; # set output record separator

my $component;
my $inPrimary = 0;
my $inStory = 0;
my @stories = ();
my %story = ();

sub print_state {
    printf "Component = %s, Total stories = %d\n", $component, scalar @stories;
    print "Current story: ", to_json(\%story, { pretty => 1 });
}

while (<>) {
    if (/component=\{\s*([^\s}]+)\s* \}/) {
        $component = $1;
    } elsif (/<Preview withToolbar>/) {
        $inPrimary = 1;
    } elsif (/<\/Preview>/) {
        $inPrimary = 0;
    } elsif (/<Story name="(.*)">/) {
        $inStory = 1;
        $story{'name'} = $inPrimary ? 'Primary' : $1;
    } elsif (/<\/Story>/) {
        $inStory = 0;
        &print_state();
        push @stories, { %story };
        %story = ();
    } elsif (/\s*(.*)/) {
        if ($inStory) {
            $story{'contents'} .= $1 . "\n";

            if (/<$component.*>/) {
                print "HERE";
            }
        }
    }
}

print "\n";
print 'STORIES: ';
print to_json(\@stories, { pretty => 1 });

print "\n";
print 'FINAL OUTPUT', "\n";
print '------------', "\n";

foreach my $s (@stories) {
    my $contents = $s->{contents};
    $contents =~ s/^/    /mg; # Indent
    $contents =~ s/\{\/\*(.*)\*\/\}/\/*$1*\//g; # Convert MDX comments to JS

    printf "\n";
    printf "export const %s: Story = {\n", $s->{name};
    printf "  render: ({ ...args }) => (\n";
    print $contents;
    printf "  )\n";
    printf "};\n";
}
