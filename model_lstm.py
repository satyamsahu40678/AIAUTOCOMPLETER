import numpy as np
import tensorflow as tf
from keras.preprocessing.sequence import pad_sequences
from keras.layers import Embedding,LSTM,Dense, Bidirectional
from keras.preprocessing.text import Tokenizer
from keras.models import Sequential
from keras.optimizers import Adam
import pickle

class Model:
    def __init__(self):
        self.model=None
        file = open('tokenizer.unknown', 'rb+')
        self.tokenizer = pickle.load(file)
        file.close()
        self.max_sequence_len=28

    def load_model(self):
        self.model = tf.keras.models.load_model('saved_model6.h5')


    def output(self,seed_text,next_words=1):

        for _ in range(next_words):
            token_list = self.tokenizer.texts_to_sequences([seed_text])[0]
            token_list = pad_sequences([token_list], maxlen=self.max_sequence_len-1 , padding='pre')
            predicted = self.model.predict(token_list)
            predicted = np.argmax(predicted)
            output_word = ""
            for word, index in self.tokenizer.word_index.items():
                if index == predicted:
                    output_word = word
                    break

        return output_word


if __name__ == '__main__':
    model = Model()
    model.load_model()
    print(model.output("how are"))



