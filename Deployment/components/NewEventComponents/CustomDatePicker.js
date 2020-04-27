import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CustomDatePicker extends React.Component {

    /* CONSTRUCTOR && STATE */

    state = {
        date: [],
    }

    constructor(props) {
        super(props);
    }

    /* CICLO DE VIDA */

    componentDidMount() {
        const { updateDate } = this.props;
        const { date } = this.state;

        let aux = (new Date().toString()).split(' ');
        let day = parseInt(aux[2]);
        let month = aux[1];
        let year = parseInt(aux[3]);

        this.setState({
            date: [day, month, year],
        });

        updateDate([day, month, year]);
    }

    /* DATE EVENTS */

    //days
    upDays = () => {
        const { date } = this.state;
        const { updateDate } = this.props;

        date[0]++;
        updateDate(date);
    }

    downDays = () => {

    }

    //months
    upMonths = () => {

    }

    downMonths = () => {

    }

    //years
    upYears = () => {

    }

    downYears = () => {
    
    }

    /* LAYOUT */
    render() {
        const { date } = this.state;

        return (
            <View style={styles.datePickerContainer}>
                {/* days */}
                <View style={styles.picker}>
                    <TouchableOpacity onPress={this.upDays}>
                        <Text>up</Text>
                    </TouchableOpacity>
                    <Text style={styles.pickerText}>
                        {date[0]}
                    </Text>
                    <TouchableOpacity onPress={this.downDays}>
                        <Text>down</Text>
                    </TouchableOpacity>
                </View>

                {/* month */}
                <View style={styles.picker}>
                    <TouchableOpacity onPress={this.upMonths}>
                        <Text>up</Text>
                    </TouchableOpacity>
                    <Text style={styles.pickerText}>
                        {date[1]}
                    </Text>
                    <TouchableOpacity onPress={this.downMonths}>
                        <Text>down</Text>
                    </TouchableOpacity>
                </View>

                {/* year */}
                <View style={styles.picker}>
                    <TouchableOpacity onPress={this.upYears}>
                        <Text>up</Text>
                    </TouchableOpacity>
                    <Text style={styles.pickerText}>
                        {date[2]}
                    </Text>
                    <TouchableOpacity onPress={this.downYears}>
                        <Text>down</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    datePickerContainer: {
        flexDirection: "row",
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
    },
    picker: {
        marginRight: 25,
        marginLeft: 25,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "red",
    },
    pickerText: {
        marginTop: 10,
        marginBottom: 10,
    }
});