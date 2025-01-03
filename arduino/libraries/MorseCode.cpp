#include "MorseCode.h"

MorseCode::MorseCode(int dotDuration, int dashDuration) 
    : dotDuration(dotDuration), dashDuration(dashDuration)
{
    initMap();
}


void MorseCode::encode(int duration) {
    if (duration >= dashDuration) {
        sequence += "-";
    } else if (duration>= dotDuration) {
        sequence += ".";
    }
}

char MorseCode::decode() {
    if (morseCodeToLetter.find(sequence) != morseCodeToLetter.end()) {
        return morseCodeToLetter[sequence];
    }

    return '?';
}

void MorseCode::clear() {
    sequence = "";
}