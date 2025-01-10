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

String MorseDecoder::decode(const char* encoded) {
    String decoded;

    char buffer[strlen(encoded) + 1];
    strcpy(buffer, encoded);
    
    char* token = strtok(buffer, " ");
    while (token != NULL) {
      char letter = '?';
      for (size_t i = 0; i < morseDictSize; i++) {
        if (strcmp(token, morseDict[i].morse) == 0) {
          letter = morseDict[i].letter;
          break;
        }
      }
      decoded += letter;
      token = strtok(NULL, " ");
    }

    return decoded;
}
