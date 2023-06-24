import axios from "axios";

import { Divider } from "primereact/divider";

import { useState, useEffect } from "react";

import NewsItem from "../../components/NewsItem";
import NewsMain from "../../components/NewsMain";
import NewsMore from "../../components/NewsMore";
import NewsSidebar from "../../components/NewsSidebar";

const Home = () => {
    const [articles, setArticles] = useState([])
    const [mainArticle, setMainArticle] = useState([])
    const [leftSideArticles, setLeftSideArticles] = useState([])
    const [rightSideArticles, setRightSideArticles] = useState([])
    const [otherArticles, setOtherArticles] = useState([])

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=7d3b02ff6d4643698d1f1f42ccf7a762')

            console.log(response.data.articles)

            const articlesArray = response.data.articles

            let filteredArticles = articlesArray.filter(item => 
                (item.author !== null) && (item.author !== '') && (item.author !== 'Axios') && (item.urlToImage !== null)
            )

            console.log(filteredArticles)

            filteredArticles = filteredArticles.filter(item =>
                (item.urlToImage.includes('.png')) || (item.urlToImage.includes('.jpg'))
            )

            setMainArticle(filteredArticles[0])
            setLeftSideArticles(filteredArticles.slice(1,3))
            setRightSideArticles(filteredArticles.slice(3,5))
            setOtherArticles(filteredArticles.slice(5,10))
            console.log(filteredArticles.slice(4,7), 'the main')
        }

        getArticles()

    }, [])

    return (
        
        <div className="container" style={{ fontFamily: "Lora" }}>
            <div className="main-content">
                <div className="article-header-container" style={{ display: "flex", flexDirection: "row"}}>
                    <NewsSidebar articles={leftSideArticles} />
                    <NewsMain article={mainArticle}/>
                    <NewsSidebar articles={rightSideArticles} />
                </div>
                <Divider />
                <NewsMore articles={otherArticles} />
                <div>
                </div>
            </div>
            {/* NEWS CONTENT CONTAINER */}
            {/* <div className="top-articles-container" style={{ display: "flex", flexDirection: "row", width: "70%" }}>
                <NewsSidebar articles={leftSideArticles} />
                <NewsMain article={mainArticle}/>
                <NewsSidebar articles={rightSideArticles} />
            </div> */}
            
        </div>
    )
}

export default Home