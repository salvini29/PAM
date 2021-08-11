import * as React from 'react';
import { Text, View, Button } from 'react-native';


function showScreen( { navigation } ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hola!</Text>
        <Button
        title="Go to asd"
        onPress={() => navigation.navigate('Hola')}
        />
      </View>
    );
}

export default showScreen;