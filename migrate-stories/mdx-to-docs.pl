#!/bin/env perl

use strict;
use warnings;

my $lf = "\n";

my $inMeta = 0;
my $inPreview = 0;
my $inPrimary = 0;

my $component = $ENV{'COMPONENT'} // 'Component';

sub name2Id {
    my ($name) = @_;

    # Remove separators and capitalize the following character
    $name =~ s{(?:[_\s]+)(\w)}{uc $1}ge;
    $name =~ s{[\s\.-]+}{}g;

    # Capitalize the first character
    substr($name, 0, 1) = uc substr($name, 0, 1);

    return $name;
}

print <<END;
import { Canvas, Controls, Meta, Primary } from '\@storybook/addon-docs/blocks';
import * as Stories from './${component}.stories';
END

while (<>) {
    if (/^import\s/) {
    } else {
        my $processed = 0;

        if (/<Meta/) {
            $inMeta = 1;
            print '<Meta of={Stories} />' . $lf;
        } elsif (/^\/>/) {
            $inMeta = 0;
            $processed = 1;
        } elsif (/<Props\s+of=/) {
            print '<Controls />' . $lf;
            $processed = 1;
        } elsif (/<Preview\s+withToolbar>/) {
            $inPreview = 1;
            $inPrimary = 1;
        } elsif (/<Preview>/) {
            $inPreview = 1;
        } elsif (/<\/Preview>/) {
            $inPreview = 0;
            $inPrimary = 0;
            $processed = 1;
        } elsif (/<Story\s+name="(.*)">/) {
            my $id = name2Id($1);
            print $inPrimary ? '<Primary />' : "<Canvas of={Stories.${id}} />\n";
        }

        if (!$processed && !$inPreview & !$inMeta) {
            print $_;
        }
    }
}
