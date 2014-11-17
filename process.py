from scipy.misc import imsave, imread
from indicoio import image_features
import json

# Compute image features for all images and save to json.
features = []
for i in range(250):
	img = imread('imgs/%s.png'%i)
	features.append(image_features(img))

json.dump(features, open('features.json', 'wb'))