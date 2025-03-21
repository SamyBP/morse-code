#ifndef MORSEDECODER_H
#define MORSEDECODER_H

#include <Arduino.h>

class MorseDecoder {
private:
    struct MorseMapping {
        const char* morse;
        char letter;
    };
    static const MorseMapping morseDict[];
    static const size_t morseDictSize;

public:
    MorseDecoder();
    String decode(const char* encoded);
    String encode(const char* word);
};

#endif // MORSEDECODER_H
