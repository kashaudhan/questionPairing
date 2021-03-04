import pickle
import sys
from generate import feature_create

model = pickle.load(open('model.pkl', 'rb'))
features = feature_create(sys.argv[1], sys.argv[2])
prob = model.predict(features)

print(prob)