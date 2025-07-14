**Fake News Detection Using Machine Learning**

This project aims to build a machine learning model that can distinguish between real and fake news articles using Natural Language Processing (NLP) techniques. With the overwhelming amount of information online, detecting misinformation is more critical than ever. This solution leverages classic ML algorithms and TF-IDF vectorization to tackle the problem.

---

 📁 Dataset

The dataset used in this project comes from [Kaggle - Fake and Real News Dataset](https://www.kaggle.com/clmentbisaillon/fake-and-real-news-dataset).  
It contains two CSV files:
- `True.csv` – Articles from real news sources
- `Fake.csv` – Articles flagged as fake

Both datasets include the article’s title, text, subject, and publication date.

---

## 🧰 Tech Stack

- **Python 3.8+**
- **Google Colab** (runtime)
- **Libraries**:
  - `pandas`, `numpy` for data manipulation
  - `scikit-learn` for ML models and evaluation
  - `nltk` for text processing (stopword removal, stemming)
  - `matplotlib`, `seaborn` for visualizations
  - `joblib` for saving models

---

## 🔍 Project Workflow

1. **Data Loading & Merging**  
   Combined the real and fake datasets into a single DataFrame, then shuffled for randomness.

2. **Exploratory Data Analysis (EDA)**  
   - Checked for missing values  
   - Visualized class distribution  
   - Combined `title` and `text` columns for more context

3. **Text Preprocessing**  
   - Converted text to lowercase  
   - Removed punctuation, numbers, and stopwords  
   - Applied stemming using NLTK’s PorterStemmer  

4. **Feature Extraction**  
   Used TF-IDF Vectorizer to convert cleaned text into numerical features, limiting to the top 5,000 features.

5. **Model Training**  
   Trained two different classifiers:
   - **Logistic Regression**
   - **Passive Aggressive Classifier**  
   Both trained on 75% of the data, tested on the remaining 25%.

6. **Model Evaluation**  
   - Accuracy, Precision, Recall, and F1-score reported  
   - Confusion matrix visualizations provided for both models

7. **Model Saving**  
   Saved trained models and TF-IDF vectorizer using `joblib` for future use.

---

## 📊 Results

Both models performed strongly with high accuracy and F1-scores. Passive Aggressive Classifier showed slightly better performance, especially in handling the imbalance between real and fake articles.

---

## 💾 How to Run

1. Clone the repository or open the notebook in Google Colab.
2. Upload the `True.csv` and `Fake.csv` files (from Kaggle).
3. Run the cells sequentially.
4. Optional: Save and reuse the trained model (`.pkl` files).

---

## ✅ Key Learnings

- Hands-on experience with preprocessing real-world text data
- Understanding and applying TF-IDF for feature extraction
- Comparing multiple classification algorithms
- Evaluating models using classification metrics and confusion matrices
- Saving and loading ML models for deployment

---

## 📌 Future Improvements

- Integrate deep learning models like LSTM or BERT for improved accuracy
- Add web scraping to fetch live news articles
- Deploy the model as a web app using Flask or Streamlit

---

## 🙌 Acknowledgements

Special thanks to the contributors of the original dataset on Kaggle.

