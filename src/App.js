import React, { useState } from "react";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import { Icon, Container, Button, Segment, Grid, Modal } from 'semantic-ui-react'
import { useGetNextNewsByUserID, useSetNewsItemProperties } from "./data";
import CustomRadioGroup from './components/news-labels';
import NewsBit from './components/news-bit';

function App() {

  const userId = sessionStorage.getItem('userId');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const [nextId, setNextId] = useState(0);
  const [newsLabels, setNewsLabels] = useState({ type: "0", category: "0", sentiment: "0" });

  const { newsItem, nextSerialNumber, newsId, totalItems, newsLoading } = useGetNextNewsByUserID(userId, nextId);
  const { newsIdEcho } = useSetNewsItemProperties(userId, newsId, newsLabels);

  const newsType = ['News', 'Opinion'];
  const newsCategory = ['Business/Finance','Crime/Security','Education','Entertainment','Govt./Politics','Health/Lifestyle','Religion','Science/Tech.','Sports'];
  const newsSentiment = ['Positive', 'Negative', 'Neutral'];

  return (
    <div className="App">
      <Segment textAlign='center' style={{ height: '50px', paddingTop: '15px', color: '#203174', backgroundColor: '#7f9ade' }}>
        <span style={{ float: 'left', fontSize: '25px' }}><Icon name='newspaper outline' /></span>
        <span style={{ float: 'left', fontFamily: 'Audiowide', fontSize: '25px' }}>News Labeler</span>
        <span style={{ float: 'right', fontSize: '18px', fontWeight: 'bold', color: '#203174' }}>
          {nextSerialNumber !== undefined ? `${newsLoading ? ".." : nextSerialNumber} of ${newsLoading ? ".." : totalItems}` : ""}
        </span>
      </Segment>
      <NewsBit newsItem={newsItem} newsLoading={newsLoading} highlighting={highlight}/>
      {nextSerialNumber !== undefined && (
        <Grid columns={2} key={nextId}>
          <Grid.Row>
            <Grid.Column style={{padding:'0px'}}>
              <Segment style={{backgroundColor:'#b9d7f9', color: '#203174', paddingLeft:'2em'}}>
                <CustomRadioGroup labels={newsCategory} labelsTitle='Category' />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment style={{backgroundColor:'#b9d7f9', color: '#203174', paddingLeft:'2em'}}>
                <CustomRadioGroup labels={newsType} labelsTitle='Type' />
              </Segment>
              <Segment style={{backgroundColor:'#b9d7f9', color: '#203174', paddingLeft:'2em'}}>
                <CustomRadioGroup labels={newsSentiment} labelsTitle='Sentiment' />
                <Button
                  style={{ float: 'right', marginTop: '33px', marginRight: '25px', fontFamily: 'Open Sans', color: '#203174', backgroundColor:'#f5cddf'}}
                  size='large'
                  disabled={false}
                  onClick={() => {
                    if (nextSerialNumber <= totalItems + 1) {
                      let type = sessionStorage.getItem('type');
                      let category = sessionStorage.getItem('category');
                      let sentiment = sessionStorage.getItem('sentiment');
                      let labels = { type, category, sentiment };
                      console.log(labels);
                      if (type > 0 && category > 0 && sentiment > 0) {
                        sessionStorage.setItem('type', 0);
                        sessionStorage.setItem('category', 0);
                        sessionStorage.setItem('sentiment', 0);
 
                        setOpen(false);
                        setNewsLabels(labels);
                        setNextId(nextSerialNumber + 1);
                        setHighlight(true);

                        setTimeout(() => {
                          setHighlight(false);
                        }, 2000);

                      } else {
                        setOpen(true);
                      }
                    }
                  }}>Next</Button>
                <Modal
                  closeIcon
                  style={{ width: '250px' }}
                  open={open}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}>
                  <Modal.Header className='modal-header'><span style={{color: 'red'}}>Action Needed!</span></Modal.Header>
                  <Modal.Content>
                    <Modal.Description style={{fontFamily: 'Open Sans', color: '#203174', fontSize: '20px'}}>
                      <Container textAlign='center'>
                        {`You Must Make a Selection For Type, Category and Sentiment.`}
                      </Container> 
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
}

export default App;