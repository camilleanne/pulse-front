#!/bin/bash

# rebuild vendor dir
rm -rf ./vendor/
mkdir ./vendor/

# vendor clmtrackr script and model
cp ./node_modules/clmtrackr/build/clmtrackr.min.js ./vendor/
cp ./node_modules/clmtrackr/models/model_pca_20_svm.js ./vendor/
