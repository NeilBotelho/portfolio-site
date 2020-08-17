---
title: 'Predicting the habitability of exoplanets'
description: "My Research project as part of the BMSIS Young Scientist Porject"
date: '17 August 2020'
projectUrl: 'https://github.com/NeilBotelho/PythonMalwareCheckUtility'
---

In the summer of 2019 I got accepted into an online mentorship program(the [Young Scientist Program](https://www.bmsis.org/ysp)) meant to get people interested in atrobiology. In that program I selected a project involving predicting the habitability of exoplanets using machine laerning algorithms(I'm gonna repeat variations on that sentence a lot in this post ;) ).   
<br/>

My mentor(an astrophysicist at the New York University, Abu Dhabi) explained to me that typically, identifying habitable exoplanets requires researchers to manually review the characteristics of all known exoplanets. These characteristics are often updated when new data is available, requiring re-review of the exoplanet. Using machine learning to identify the likelihood that a given exoplanet is habitable could greatly increase the efficacy of this process.   
<br/>

Initially I thought this would be a fairly straight forward task, compile a list of promising machine learning algorithms, feed the data in, tune the hyperparameters and select the model with the best results. But as I quickly found out, real world problems are not that simple. A jupyter notebook containing a walkthrough of my research can be found on the [github repository](https://github.com/NeilBotelho/PythonMalwareCheckUtility), but I'm writing this post to share some of the problems I came across during this project.   
<br/><br/>

# The Data  

The first obstacle I faced was my data itself. I used the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?), list of confirmed exoplanets. I found that the dataset had a lot of data(over 350 columns and 3500 records of exoplanets). This was both a blessing and a curse as some columns in the dataset couldn't be used for training. For example the rowupdate(Date of last update of the planet parameters) column. So I had to manually go through each column in the dataset and remove it if it couldnt be used to train the model or if it would introduce bias in the model like the st_nts column(represents the number of literature time series available for the planet’s star in the NASA exoplanet archive).   
<br/> 


After a few minutes of exploring the data I found out that although it seemed like there was a lot of data in the dataset, the dataset was extremely sparse. A lot of the 350 columns had 60% - 99% of their data missing. Additionally the dataset was incredibly imbalanced, i.e. There were over 3500 non-habitable exoplanets and only around 50 habitable ones. This means that simply training any machine learning algorithm on the data might yield a model that would ouput "not habitable" regardless of what the input is. After about a day of crawling stackoverflow and scikit learn's documentation, I found out that this is fairly common for real world datasets and found a few methods for dealing with it. To deal with the missing data I decided to drop columns with more than 40% missing data and impute the remaining columns. To deal with the imbalanced nature of the dataset, I decided to use SMOTE oversampling(essentially making copies of the habitable exoplanets so that the model doesn't favour non-habitable output).   
<br/><br/>  

# Training  

My next big obstacle came in the form of a hardware challenge. To tune the hyperparameters of each machine learning algorithm I was using a custom grid search function which had the unfortunate drawback of having to train and test the algorithm on every combination of the passed hyperparameters. This meant that training  would take a long time. For context at the time I was training on a laptop with around 3.5 GB of usable RAM and an AMD A6-7310 APU(A pretty terrible CPU). So unless I wanted to only run models on my laptop for two weeks I had to find some alternative. The best solution I came up with was running each algorithm in a separate jupyter notebook on kaggle and printing out the results. Kaggle provides 9 hours of free compute time per notebook, which was luckily just enough to run each algorithm.   
<br/><br/>  

# Verification  

The final obstacle I faced was my method for verification. The method I came up with to verify my result required me to generate 10,000 unique random groupings of the 150 columns I had available in my final dataset(a full description of the algorithm I used can be found in the jupyter notebook). But again, I couldn't run this on my laptop. And kaggle wasn't an option this time as it took more than 9 hours to get the 10,000 unique groupings I needed. So I ended up running my script to generate the groupings on my raspberry pi. I added a checkpointing system that would save the results to disk every 100 new groupings in case of a power outage and it would then resume from the last checkpoint on startup. It took the raspberry pi 2 weeks to complete all 10,000 groupings.    
<br/>  

In the end I found that the CatBoost algorithm was most effective in predicting the habitability of an exoplanet. Oh also I am currently in the process of publishing my work in an IEEE conference paper, so fingers crossed that it goes through ;).
