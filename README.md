# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Elia Fantini | 336006 |
| Konrad Litwiński | 353647 | 
| Adrien Vauthey | 301289 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (7th April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

The [first dataset](https://www.kaggle.com/datasets/gauthamp10/apple-appstore-apps) from Kaggle is a collection of data related to iOS apps available on the Apple App Store. It includes information on over 1.2 million apps and similar to the previous dataset it contains details such as the app's name and ID, category, rating, price, developer information, content rating, and users' ratings and reviews.  

The [second dataset](https://www.kaggle.com/datasets/gauthamp10/google-playstore-apps) is again from Kaggle, from the same author as the first one, and for this reason, it shares many similarities. It is a comprehensive collection of data related to Android apps available on the Google Play Store, with information on over 2.3 million apps. Among the information that can be found, there are the same as in the App Store one plus some precious data such as the number of installs, privacy policy, if it contains in-app purchases or not, and if it has been selected as "Editors' choice". This dataset will be even more useful to analyze the popularity of different types of Android apps and understand trends in the Android app market, while the Apple Store's dataset is more limited but can be used to do some comparison and spot possible differences among the two platforms.

Kaggle already provides the most fundamental info about the datasets, such as missing data, distributions, and pie charts of categorical data. In addition, there is our EDA as well as others from Kaggle's notebooks. The data is already in good condition for the categories we will use, there are a lot of missing values in "Developer website" in the Apple dataset and some in size for the Play Store one. Unfortunately, the "Editors Choice" is useless as all data is equal to "False". Some distributions look regular whereas others present some outliers that are likely very meaningful, such as huge apps with a lot more downloads than the average. We see that little preprocessing and cleaning will be needed and it will vary depending on which information we will decide to focus on among the provided ones.

### Problematic

Mobile applications have become an integral part of our daily lives and their market grows rapidly. According to recent studies ([source 1](https://www.grandviewresearch.com/industry-analysis/mobile-application-market#:~:text=Report%20Overview,13.8%25%20from%202023%20to%202030), [source 2](https://www.statista.com/statistics/292751/mobile-gaming-revenue-worldwide-device/#:~:text=In%202022%2C%20mobile%20games%20are,U.S.%20dollars%20in%20global%20revenue)), the global mobile application market size was valued at USD 206 billion in 2022 and is projected to grow at a CAGR of 13.8% from 2023 to 2030. Mobile games alone held the largest revenue share of more than 42% and are expected to generate approximately 92.2 billion U.S. dollars in annual revenue, accounting for 50% of the global gaming market in 2022 and overtaking the results obtained by AAA console and PC games. Gaming apps are then followed by Music & Entertainment, Social Networks, and Health and Fitness apps. 

With this growth and potential for profit, it is crucial for publishers and indie developers to understand what makes an app successful, and how to utilize the app store's potential to create the next million-dollar app. In this context, data visualization can be a powerful tool to gain insights and identify strategies to create popular apps, as well as highlight failure cases. Additionally, this visualization can be useful for marketers, investors, and researchers who are interested in understanding the dynamics of the mobile app market and its potential for growth.

The goal of this project is then to develop such visualizations by analyzing Google Play Store's data of 2.3 million+ applications together with  1.2 Million+ applications' data from Apple's AppStore.  Our visualization aims at showing the success factors of top-ranked apps: is there a relation between average rating and the number of installs? Does the app support ads and microtransactions? Is it free? Are there better monetization strategies for different categories? All this and more with insightful and aesthetically pleasant visualizations.

### Exploratory Data Analysis

Our exploratory data analysis can be found in this [notebook](https://github.com/com-480-data-visualization/project-2023-insightsquad/blob/master/initial_notebook.ipynb)

### Related work

The Google Play Store dataset is a quite famous dataset on Kaggle and has already been explored by many notebooks, and some works can be found on the Apple Store dataset too. Most such notebooks do general exploratory data analysis of the dataset, while others try to train predictors of the number of reviews of a certain app or other simple classifiers. None of these works were trying to address the specific problem that we described and especially not by putting together Android and iOS data. Furthermore, these notebooks provided basic visualizations and statistics, while we plan to go further and tell a "story of success" by creating interactive visualizations that allow users to explore the data in a more intuitive way, as well as more insightful and aesthetically pleasant representations.

To do so, we took inspiration from the best websites about data visualisation such as:

- [The 25 Best Data Visualizations of 2023](https://visme.co/blog/best-data-visualizations/)
- [Dataviz Inspiration](https://www.dataviz-inspiration.com/)
- [Web Design Done Well: Delightful Data Visualization Examples](https://www.smashingmagazine.com/2022/06/web-design-done-well-delightful-data-visualization-examples/) 
- [The D3 graph gallery](https://d3-graph-gallery.com/)
- [DataIsBeautiful from Reddit](https://www.reddit.com/r/dataisbeautiful/)

Among those, we found the first two full of very creative ideas, and we could learn how showing data in a visually pleasant way really makes the difference from learning something out of the data or not. We then aim to do similarly, not only showing useful data in a clear and useful way but also from an original point of view.  More precisely, the following projects really caught our attention:
- [What it takes to go to space](https://www.behance.net/gallery/86241381/Data-Visualisation-What-it-takes-to-go-to-space)
- [The Slow Loss](https://www.behance.net/gallery/151474693/The-Slow-Loss-La-Lettura-dataviz)
- [X-Men comics exploration](https://r-graph-gallery.com/web-streamchart-with-ggstream.html)
- [Adyen's Shareholder report](https://www.visualcinnamon.com/portfolio/adyen-report-2019/)

Following these great examples, we'll try to create our own original and unique visualization.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**

The initial website of our website is accessible [here](https://com-480-data-visualization.github.io/project-2023-insightsquad/website/index.html)

A visual draft of the website is providede below:
![Homepage 1](https://user-images.githubusercontent.com/62103572/235930972-bbe4e114-932d-4167-bdfd-83ad363d4efc.png)

### Website description
The website is designed to provide an overview and detailed analysis of mobile apps from different categories on both Apple and Android platforms. The website is built as one single page that can be divided in four subparts, each containing different data visualizations.

#### First part: Homescreen
At the top, there will be a horizontal menu to jump to each part of the website.
In the first container, there is text with the headings: number of downloads and number of apps. This gives a general overview of the website's content and what users can expect to find.


The second container contains a slider that users can use to switch between Apple and Android platforms. This container also includes a Sankey diagram, which provides a visual representation of the dataset and gives insight into the revenue model and success of different categories. The Sankey diagram contains the following information: categories, free/paid, with/without ads, with/without in-app purchases, number of downloads and reviews, stars, content rating. For Android apps, there is also a slider that users can use to change the Sankey diagram to editor choice apps diagram, containing the following information: categories , free/paid , with/without ads , with/without in-app purchases , top 10/100/1000 number of downloads and reviews , stars, content rating.
In the third container, users can view a time evolution plot, which shows the evolution of the top 5 most present categories in time with a streamgraph. Users can switch from category to content rating. On the side, there are several famous apps and hovering/clicking on them show when they were launched in the timeline.
In the fourth container, users can choose among different categories using the Android/Apple slider. There is a treemap of all the categories, and when users click on one of them, they can zoom in to get extra information about it. The top 10 apps are displayed with their number of downloads. There is also a button to choose between free or paid apps, and users can view the proportion within each rectangle.
Finally, there is also a stacked bar plot that shows free/paid apps and those with ads or not, with in-app purchases or not, of all apps of the category, or only the top 1000, 100, or 10.
Overall, the website provides a comprehensive analysis of mobile apps on both Apple and Android platforms with multiple data visualizations and interactive features.


Extra ideas
The page with extra information will have a circular packing chart for most downloaded apps. Hovering one of them will show specific information about that app. 
Extract application’s logo with API.
Smoother transition between pages.
2D correlation density plot of reviews rating and install number. If users click a category, it goes from general to that category. 



## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

