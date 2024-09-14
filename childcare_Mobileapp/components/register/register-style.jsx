import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    /* Container styling */
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "#f5f5f5",
      justifyContent: 'center',
    },
    scroll_container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#f5f5f5",
    },
    /* Styling in childs profile picture */
    small_pic: {
        width: 100,
        height: 100,
    },
    /* Form styling in login and register */
    form: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    /* Input fields styling */
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1
    },
    /* Form title styling */
    title: {
        fontSize: 20,
        padding: 10
    },
    error: { 
        color: 'red', 
        fontSize: 12,
        marginLeft: 12,
        marginBottom: 12
    },

    list_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    list_content_title: {
        fontSize:12,
        fontWeight: 'bold'
    }
});
