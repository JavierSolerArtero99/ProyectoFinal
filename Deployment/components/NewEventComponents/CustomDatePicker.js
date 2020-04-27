import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CustomDatePicker extends React.Component {

    /* CONSTRUCTOR && STATE */

    state = {
        date: [],
        months: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]
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
        let month = new Date().getMonth();
        let year = parseInt(aux[3]);

        this.setState({
            date: [day, month, year],
        });

        updateDate([day, month, year]);
    }

    /* METODOS DE AYUDA */

    getMaxMonthDay(month, year) {
        if (((month + 1) <= 7)) {
            if ((month + 1) % 2 == 0) {
                if ((month + 1) == 2) {
                    return this.getLeapDays(year);

                } else {
                    return 30;
                }

            } else {
                return 31;
            }

        } else {
            if ((month + 1) % 2 != 0) {
                return 31;
            } else {
                return 30;
            }
        }
    }

    getLeapDays(year) {
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            return 29;
        } else {
            return 28;
        }
    }

    /* DATE EVENTS */

    //days
    upDays = () => {
        const { date } = this.state;
        const { updateDate } = this.props;
        let day = parseInt((new Date().toString()).split(' ')[2]);

        if ((date[0] + 1) <= this.getMaxMonthDay(date[1], date[2])) {
            date[0]++;
        } else {
            date[0] = 1;
            this.upMonths();
        }

        updateDate(date);
    }

    downDays = () => {
        const { date } = this.state;
        const { updateDate } = this.props;

        if ((date[0] - 1) > 0) {
            date[0]--;
        } else {
            this.downMonths();
            date[0] = this.getMaxMonthDay(date[1], date[2]);
        }
        updateDate(date);
    }

    //months
    upMonths = () => {
        const { date } = this.state;
        const { updateDate } = this.props;

        if ((date[1] + 1) > 11) {
            date[1] = 0;
            date[2]++;

        } else {
            date[1]++;
        }

        updateDate(date)
    }

    downMonths = () => {
        const { date } = this.state;
        const { updateDate } = this.props;

        if ((date[1] - 1) < 0) {
            date[1] = 11;
            this.downYears();

        } else {
            date[1]--;
        }

        updateDate(date)
    }

    //years
    upYears = () => {
        const { date } = this.state;
        const { updateDate } = this.props;

        date[2]++;
        updateDate(date);
    }

    downYears = () => {
        const { date } = this.state;
        const { updateDate } = this.props;
        let year = ((new Date().toString()).split(' '))[3];

        if (year <= (date[2] - 1)) {
            date[2]--;
            updateDate(date);
        }
    }

    /* LAYOUT */
    render() {
        const { date, months } = this.state;

        return (
            <View style={styles.container}>
                <Text style={[styles.pickerText, {marginBottom: 10}]}>CHECK-IN DATE</Text>

                <View style={styles.datePickerContainer}>
                    {/* days */}
                    <View style={styles.picker}>
                        <TouchableOpacity style={styles.manipulateDate} onPress={this.upDays}>
                            <Text style={styles.pickerText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {date[0]}
                        </Text>
                        <TouchableOpacity style={styles.manipulateDate} onPress={this.downDays}>
                            <Text style={styles.pickerText}>-</Text>
                        </TouchableOpacity>
                    </View>

                    {/* month */}
                    <View style={styles.picker}>
                        <TouchableOpacity style={styles.manipulateDate} onPress={this.upMonths}>
                            <Text style={styles.pickerText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {months[date[1]]}
                        </Text>
                        <TouchableOpacity style={styles.manipulateDate} onPress={this.downMonths}>
                            <Text style={styles.pickerText}>-</Text>
                        </TouchableOpacity>
                    </View>

                    {/* year */}
                    <View style={styles.picker}>
                        <TouchableOpacity style={styles.manipulateDate} onPress={this.upYears}>
                            <Text style={styles.pickerText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {date[2]}
                        </Text>
                        <TouchableOpacity style={styles.manipulateDate} onPress={this.downYears}>
                            <Text style={styles.pickerText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#323232",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 15,
        padding: 5
    },
    datePickerContainer: {
        flexDirection: "row",
    },
    picker: {
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 5,
        alignItems: "center",
        flexDirection: "column",
    },
    manipulateDate: {
        backgroundColor: "#434343",
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    pickerText: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
    }
});