import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Pickers que seleccionan un color i un icono para el nuevo evento
 * @param {*} props 
 */
export default class Pickers extends React.Component {

    /* STATE */
    state = {
        colors: [
            "#14ffec",
            "#ff005a",
            "#4ad869",
            "#ef611e",
            "#2380d1",
            "#ffc801",
        ],
        icons: [
            "check",
            "spray-bottle",
            "basketball",
            "football",
            "bread-slice",
            "watch",
            "alarm",
            "death-star",
            "death-star-variant",
            "space-invaders",
            "flash-circle",
            "language-cpp",
            "smoking",
            "smoking-off",
            "alert",
            "album",
            "cup",
            "cup-off",
            "disqus",
            "dice-6",
            "beaker",
            "earth",
            "camcorder",
            "email",
            "fire",
            "water",
            "cow",
            "chat",
            "database",
            "currency-gbp",
            "currency-jpy",
            "currency-eur",
            "currency-usd",
            "cube-scan",
            "visual-studio",
        ],
        iconSelected: "check",
        selectingIcon: false,
    }

    /* CICLO DE VIDA */

    componentDidMount() {
        const { defaultIcon } = this.props;

        (defaultIcon != undefined) && (this.setState({iconSelected: defaultIcon}))
    }

    /* EVENTOS */

    /**
     * abre la ventana para seleccionar un icono
     */
    selectIcon = () => {
        const { selectIcon, selectingIcon } = this.state;

        this.setState({
            selectingIcon: !selectingIcon
        })

    }

    /**
     * metodo que llama el flatlist para renderizar cada icono
     */ 
    renderSingleIcon = (item) => {
        const { iconSelected } = this.state;

        return (
            (item == iconSelected) ?
                (<TouchableOpacity style={[styles.singleIconContainer, { backgroundColor: "#545454" }]}>
                    <MaterialCommunityIcons
                        name={item}
                        color={this.props.color}
                        size={30}
                    />
                </TouchableOpacity>)
                :
                (<TouchableOpacity
                    style={styles.singleIconContainer}
                    onPress={() => { this.changeIcon(item) }}
                >
                    <MaterialCommunityIcons
                        name={item}
                        color={this.props.color}
                        size={30}
                    />
                </TouchableOpacity>)
        )
    }

    /**
     * devuelve una flatlist con todos los iconos
     */
    renderIcons = () => {
        return (
            <FlatList
                data={this.state.icons}
                renderItem={({ item }) => this.renderSingleIcon(item)}
                numColumns={7}
            />
        )
    }

    /**
     * actualiza el color seleccionado
     */
    changeColor = () => {
        const { color, updateColor } = this.props;
        const { colors } = this.state;
        let index;

        for (let i = 0; i < color.length; i++) {
            if (colors[i] == color) {
                index = i;
            }
        }

        if ((index + 1) > colors.length - 1) {
            index = 0;
        } else {
            index++;
        }

        updateColor(colors[index]);
    }

    /**
     * actualiza el icono del evento
     */
    changeIcon = (item) => {
        const { updateIcon } = this.props;

        updateIcon(item)

        this.setState({
            iconSelected: item,
            selectingIcon: false,
        })
    }

    /* LAYOUT */
    
    render() {
        const { color } = this.props;
        const { iconSelected, selectingIcon } = this.state;

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>

                    <View style={styles.pickerContainer}>
                        <View style={styles.circle}>
                            <TouchableOpacity
                                onPress={this.selectIcon}
                            >
                                <MaterialCommunityIcons name={iconSelected} color={color} size={30} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.pickerText}>Icon</Text>
                    </View>

                    <View style={styles.pickerContainer}>
                        <View style={styles.circle}>
                            <TouchableOpacity
                                onPress={this.changeColor}
                                style={[styles.color, { backgroundColor: color }]}
                            ></TouchableOpacity>
                        </View>
                        <Text style={styles.pickerText}>Color</Text>
                    </View>
                </View>

                {selectingIcon &&
                    (
                        <View style={styles.iconsContainer}>
                            {this.renderIcons()}
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 10,
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 30,
        marginRight: 30,
    },
    circle: {
        borderRadius: 50,
        width: 45,
        height: 45,
        marginRight: 10,
        backgroundColor: "#323232",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        flex: 1,
    },
    color: {
        width: 24,
        height: 24,
        borderRadius: 50,
    },
    pickerText: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
    },
    iconsContainer: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: "#323232",
        marginTop: 10,
        alignSelf: "center",
        width: '90%'
    },
    singleIconContainer: {
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 3,
        marginTop: 3,
        borderRadius: 100,
        padding: 2,
    }
});