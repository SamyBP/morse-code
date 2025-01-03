#ifndef MORSECODE_H
#define MORSECODE_H

#include <Arduino.h>
#include <map>

class MorseCode {
private:
    String sequence;
    
    int dotDuration;
    int dashDuration;

    std::map<String, char> morseCodeToLetter;

    void initMap() {
        morseCodeToLetter[".-"] = 'A';
        morseCodeToLetter["-..."] = 'B';
        morseCodeToLetter["-.-."] = 'C';
        morseCodeToLetter["."] = 'E';
        morseCodeToLetter["-.."] = 'D';
        morseCodeToLetter["..-."] = 'F';
        morseCodeToLetter["--."] = 'G';
        morseCodeToLetter["...."] = 'H';
        morseCodeToLetter[".."] = 'I';
        morseCodeToLetter[".---"] = 'J';
        morseCodeToLetter["-.-"] = 'K';
        morseCodeToLetter[".-.."] = 'L';
        morseCodeToLetter["--"] = 'M';
        morseCodeToLetter["-."] = 'N';
        morseCodeToLetter["---"] = 'O';
        morseCodeToLetter[".--."] = 'P';
        morseCodeToLetter["--.-"] = 'Q';
        morseCodeToLetter[".-."] = 'R';
        morseCodeToLetter["..."] = 'S';
        morseCodeToLetter["-"] = 'T';
        morseCodeToLetter["..-"] = 'U';
        morseCodeToLetter["...-"] = 'V';
        morseCodeToLetter[".--"] = 'W';
        morseCodeToLetter["-..-"] = 'X';
        morseCodeToLetter["-.--"] = 'Y';
        morseCodeToLetter["--.."] = 'Z';
    }

public:
    MorseCode(int dotDuration, int dashDuration);

    void encode(int duration);
    void clear();
    char decode();
}

#endif