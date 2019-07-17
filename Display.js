var Display = function Display(props) {

    //let formattedTimes = formatTimes(props.times);
    return React.createElement(
        "div",
        { className: "display" },
        props.times
    );
};