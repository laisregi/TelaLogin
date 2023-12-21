import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  Keyboard
} from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({x : 0, y : 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}));

  useEffect(()=> {
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', KeyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', KeyboardDidHide);


    Animated.parallel([
       Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness:20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
      })
    ]).start();
   

  }, []);

  function KeyboardDidShow(){

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue:55,
        duration: 100,
  }),
    Animated.timing(logo.y, {
    toValue:65,
    duration: 100,
    }),
    ]).start();

  }

  function KeyboardDidHide(){
     Animated.parallel([
      Animated.timing(logo.x, {
        toValue:130,
        duration: 100,
  }),
    Animated.timing(logo.y, {
    toValue:155,
    duration: 100,
    }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>

      <View style={styles.containerLogo}>
      <Animated.Image
      style={{
        width: logo.x,
        height: logo.y,
      }}
      source={require('.//assets/imagens/logocubo.png')}
      />
      </View>
    
      <Animated.View 
      style={[
        styles.container,
        {
          opacity: opacity,
          transform:[
            {translateY: offset.y}
          ]
        }
      ]}
      >
        <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        onChangeText={()=> {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={()=> {}}
        />
     
     <TouchableOpacity style={styles.btnSubmit}>
      <Text style={styles.submitText}>Acessar</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.btnRegister}>
      <Text style={styles.registerText}>Criar conta gratuita</Text>
     </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo:{
    flex:1,
    justifyContent: 'center',
    padding: 90
  },
  container:{
   flex:1,
   alignItems:'center',
   justifyContent:'center',
   width: '90%',
   paddingBottom:100
  },
  input:{
    backgroundColor:'#FFF',
    width:'90%',
    marginBottom:15,
    color:'#222',
    fontSize:17,
    borderRadius:7,
    padding:10
  },
  btnSubmit:{
    backgroundColor:'#35AAFF',
    width:'90%',
    height: 45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:7
  },
  submitText:{
    color:'#FFF',
    fontSize: 18
  },

  btnRegister:{
    marginTop:10,
    
  },
  registerText:{
    color:'#FFF',
  }

});