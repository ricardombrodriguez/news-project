import React from 'react'
import image from '.././data/Image.png'
import image10 from '.././data/image10.png'
import tw from "tailwind-styled-components"
import api from '../api/ApiConnection'

const Header = tw.p`
  font-serif
  text-xl 
  font-extrabold  
  text-black
  text-justify 
  mb-2
`;

const NewsText = tw.p`
  font-serif 
  text-black 
  dark:text-gray-400 
  text-justify 
  text-m
`;



const General = () => {
  const [news, setNews] = React.useState([])

  React.useEffect(() => {
    api.get('/news').then((response) => {
      setNews(response.data)
      console.log(response.data)
    })
  }, [])


  return (
    <div className='flex lg:flex-row justify-between gap-12 md:flex-col'>
      <div className="w-2/5">
        <div className=''>
          <div className='mb-4'>
            <img className='width-full' src={image} alt="Logo" />
          </div>
          <Header>
            {news.title}
          </Header>
          <NewsText>
            {news.description}
          </NewsText>
        </div>
      </div>
      
      
      <div className='flex flex-col w-2/5 justify-between'>
        <div>
            <Header>
               A Freshman Republican in Oklahoma Makes the Case for Big Spending Cuts
            </Header>
            <NewsText>
            Representative Josh Brecheen’s calls for a debt showdown reflects how the party has linked its spending fight with cultural battles.
            Representative Josh Brecheen’s calls for a debt showdown reflects how the party has linked its spending fight with cultural battles.
            </NewsText>
            
        </div>
        <hr class="h-px  bg-gray-600 border-0 dark:bg-gray-200"></hr>
        <div>
          <Header>
              U.S. Is Said to Consider Reinstating Detention of Migrant Families
            </Header>
            <NewsText>President Biden has turned to increasingly restrictive measures as his administration prepares for the end of Title 42, which has allowed border authorities to swiftly expel migrants, which has allowed border authorities to swiftly expel migrants. </NewsText>
        </div>
        
      </div>
      <div class="left-1/2 -ml-0.5 w-0.5 bg-gray-600"></div>
      <div className='w-1/5'>
        <div className='mb-3'>
          <img src={image10} alt="Logo" />
        </div>
        <Header>
          Debt Default Would Cripple U.S. Economy, New Analysis Warns
        </Header>
        <NewsText>
          As President Biden prepares to release his latest budget proposal, a top economist will warn lawmakers that Republicans’ refusal to raise the nation’s borrowing cap could put millions out of work.
        </NewsText>
      </div>
  </div>
  )
}

export default General