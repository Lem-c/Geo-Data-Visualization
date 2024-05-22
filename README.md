# CASA003 Group Mini Project

This repo contains raw source code and static web files that deployed on the github.

**Group Members**: **Juanes Lamilla**, **Yuhao Chen**, **Zihan iu**

This project is based on the templet: [Vue Material Kit](https://www.creative-tim.com/learning-lab/vue/overview/material-kit/) under the vue-vite environment (VueJS 3 + Bootstrap 5).

## Components

The index page is created by some pre-built components: Navigation bar, Image + titler contained header, mosaic transparent card container and span box container.

## Design Idea

The idea of first global map came from ONS [UK trade page](https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade/latest). It is a fantastic view that shows the trade partner
by connecting them together. 

```{html}
<iframe height="749px" width="100%" src="https://www.ons.gov.uk/visualisations/dvc2914/worldmap/index.html"></iframe>
```

The web page begins with an introduction to the background of UK trade, outlining the reasons for selecting this topic and providing a detailed description of each section. The document is divided into three main parts: Global Trade Data, Regional Analysis of UK Trade, and Economic Data of London.

The [Datamap](https://github.com/markmarkoh/datamaps) tool, discovered by Juanes, has proven invaluable. To enhance the appeal of the first section, we aim to present the extensive data in a more dramatic fashion. This is achieved by creating an overlapped view, where an Echart is superimposed over a graphical representation of the Earth. This visualization not only depicts the trade routes between the UK and its partners but also illustrates the fluctuations in trade values over a twenty-year period, providing a clear perspective on trends in growth or decline. For additional insights into the most common modes of cargo transportation and the predominant import/export products, users can access extended data by clicking on "reveal more trade data."

## How to Run the Project

Make sure Node.js has been installed on your PC.

Open the command line and navigate to the project directory. Run the following command to install the necessary packages:

```
npm install
```

After installing all of necessary packages, you are able to run development env and build static files:

```
npm run dev

npm run build
```
