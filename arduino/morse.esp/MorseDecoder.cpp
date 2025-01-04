#include "MorseDecoder.h"

const MorseDecoder::MorseMapping MorseDecoder::morseDict[] = {
    {".-", 'A'}, {"-...", 'B'}, {"-.-.", 'C'}, {"-..", 'D'}, {".", 'E'},
    {"..-.", 'F'}, {"--.", 'G'}, {"....", 'H'}, {"..", 'I'}, {".---", 'J'},
    {"-.-", 'K'}, {".-..", 'L'}, {"--", 'M'}, {"-.", 'N'}, {"---", 'O'},
    {".--.", 'P'}, {"--.-", 'Q'}, {".-.", 'R'}, {"...", 'S'}, {"-", 'T'},
    {"..-", 'U'}, {"...-", 'V'}, {".--", 'W'}, {"-..-", 'X'}, {"-.--", 'Y'},
    {"--..", 'Z'}, {".----", '1'}, {"..---", '2'}, {"...--", '3'}, {"....-", '4'},
    {".....", '5'}, {"-....", '6'}, {"--...", '7'}, {"---..", '8'}, {"----.", '9'},
    {"-----", '0'}
};
const size_t MorseDecoder::morseDictSize = sizeof(MorseDecoder::morseDict) / sizeof(MorseDecoder::MorseMapping);

MorseDecoder::MorseDecoder() {}

String MorseDecoder::decode(const String& morseCode) {
    String decodedText;
    int start = 0;
    int spaceIndex;

    while ((spaceIndex = morseCode.indexOf(' ', start)) != -1) {
        String token = morseCode.substring(start, spaceIndex);
        start = spaceIndex + 1;

        char decodedChar = '?';
        for (size_t i = 0; i < morseDictSize; i++) {
            if (token == morseDict[i].morse) {
                decodedChar = morseDict[i].letter;
                break;
            }
        }
        decodedText += decodedChar;
    }

    String lastToken = morseCode.substring(start);
    if (!lastToken.isEmpty()) {
        char decodedChar = '?';
        for (size_t i = 0; i < morseDictSize; i++) {
            if (lastToken == morseDict[i].morse) {
                decodedChar = morseDict[i].letter;
                break;
            }
        }
        decodedText += decodedChar;
    }

    return decodedText;
}
