import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    WebView,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Dimensions
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class WebScreen extends Component {

    state = {
        url: '',
        anim: new Animated.Value(0),
        loading: false,
    }

    componentDidMount() {
        this.animation = Animated.loop(
            Animated.timing(this.state.anim, {
                toValue: Dimensions.get('window').width,
                duration: 1500,
            })
        );
    }

    componentWillUnmount() {
        // this.animation.stop()
    }

    changeUrl(url) {
        this.setState({ url });
    }

    toggleLoading(loading) {
        this.setState({ loading });
    }

    onNavigationStateChange(web) {
        console.log(web)
    }

    onLoad() { }

    onLoadStart() {
        this.animation.start();

        this.toggleLoading(true)
    }

    onLoadEnd() {
        this.toggleLoading(false)
    }

    renderLoadingBar() {
        return this.state.loading
            ?
            <Animated.View
                style={{ backgroundColor: 'black', height: 2, width: this.state.anim }}
            />
            :
            <View style={{ height: 2 }} />
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, styles.youtube]}
                        onPress={() => this.changeUrl('https://www.youtube.com/')}>
                        <FontAwesome size={18} color='white' name='youtube' />
                        <Text style={{ color: 'white' }}>Youtube</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.github]}
                        onPress={() => this.changeUrl('https://github.com/facebook/react-native')}>
                        <FontAwesome size={18} color='black' name='github' />
                        <Text style={{ color: 'black' }}>Github</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.facebook]}
                        onPress={() => this.changeUrl('https://www.facebook.com/')}>
                        <FontAwesome size={18} color='white' name='facebook' />
                        <Text style={{ color: 'white' }}>Facebook</Text>
                    </TouchableOpacity>
                </View>

                {this.renderLoadingBar()}

                {this.state.url != "" &&
                    <WebView
                        startInLoadingState={true}
                        renderError={(error) =>
                            <View style={styles.section}>
                                <Text>{error}</Text>
                            </View>
                        }
                        renderLoading={(loading) =>
                            <View style={styles.section}>
                                <ActivityIndicator size="small" color="grey" />
                            </View>
                        }
                        onLoadStart={this.onLoadStart.bind(this)}
                        onLoadEnd={this.onLoadEnd.bind(this)}
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                        source={{ uri: this.state.url }}
                    />
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        paddingTop: 20
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 3,
        padding: 15,
        margin: 5,
    },
    youtube: {
        backgroundColor: 'red'
    },
    github: {
        backgroundColor: 'white',
        borderWidth: 1,
    },
    facebook: {
        backgroundColor: 'steelblue'
    }
});

export default WebScreen;
