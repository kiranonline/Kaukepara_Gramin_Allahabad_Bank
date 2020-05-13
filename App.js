import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Appbar, Avatar, Title, Headline, ActivityIndicator, Colors, Button } from 'react-native-paper';

const axios = require('axios');

const App = () => {
  const [fetching, setFetching] = useState(false);
  const [bankStatus, setbankStatus] = useState();
  const [reason, setReason] = useState();

  useEffect(() => {
    fetchStatus();
  }, []);

  let fetchStatus = () => {
    console.log('Starting api call');
    setFetching(true);
    axios.get('https://kaukepara-allahabad.herokuapp.com/api/status/?format=json').then((result) => {
      console.log(result.data)
      if(Array.isArray(result.data) && result.data.length>0){
        setbankStatus(result.data[0].current_status);
        setReason(result.data[0].reason);
      }
      else{
        console.log("e")
        setbankStatus("Error");
        setReason("Server error, unable to fetch data at this moment");  
      }
    }).catch((err) => {
      console.log("err",err);
      setbankStatus("Error");
      setReason("Server error, unable to fetch data at this moment");
    }).finally(()=>{
      setFetching(false);
    })
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Avatar.Image size={37} source={require('./b.jpeg')} style={styles.avatarMarginLeft} />
        <Appbar.Content title="Allahabad Bank" subtitle="Kaukepara" />
      </Appbar.Header>
      <View style={styles.bodyStyle}>
        <Avatar.Image size={130} source={require('./main.jpeg')} style={styles.personImage} />
        <Headline>Ajmira Khatun</Headline>
        <Title style={{ fontSize: 18 }}>Kaukepara Gramin Allahabad Bank</Title>
        <Title style={{ fontSize: 14 }}>+91-9143077051</Title>
        {fetching ?
          <ActivityIndicator animating={true} color={Colors.red800} />
          :
          <React.Fragment>
            <View style={styles.statusBox}>
              {bankStatus==='Closed' ?
                (<React.Fragment>
                  <Title style={{ fontSize: 20, color:'red' }}>The bank is closed</Title>
                  <Title style={{ fontSize: 16, color:'red' }}>{reason}</Title>
                </React.Fragment>
                )
              :
              (
                <React.Fragment>
                  {bankStatus==='Open'?(
                    <React.Fragment>
                    <Title style={{ fontSize: 24, color: 'green' }}>The bank is Open</Title>
                    <Title style={{ fontSize: 16, color:'green' }}>{reason}</Title>
                  </React.Fragment>
                  )
                  :
                  <Title style={{ fontSize: 24, color: 'red', padding:10 }}>Error</Title> 
                  }
                </React.Fragment>
              )
              }
            </View>
            <Button mode="contained" onPress={() => fetchStatus()}>
              Refresh
            </Button>
          </React.Fragment>
          

        }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarMarginLeft: {
    marginLeft: 10,
  },
  bodyStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  personImage: {
    marginTop: 20,
  },
  statusBox: {
    backgroundColor: 'yellow',
    width:'80%',
    marginTop:50,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginBottom:50
  }
});
export default App;
