var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.formatTimes = function (times) {
            var pad0 = function pad0(value) {
                var result = value.toString();
                if (result.length < 2) {
                    result = '0' + result;
                }
                return result;
            };
            return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
        };

        _this.update = function () {
            _this.setState({
                times: {
                    miliseconds: _this.state.times.miliseconds += 1,
                    seconds: _this.state.times.seconds,
                    minutes: _this.state.times.minutes
                }
            });
            if (_this.state.times.miliseconds >= 100) {
                _this.setState({
                    times: {
                        seconds: _this.state.times.seconds += 1,
                        miliseconds: 0,
                        minutes: _this.state.times.minutes
                    }
                });
            }
            if (_this.state.times.seconds >= 60) {
                _this.setState({
                    times: {
                        seconds: 0,
                        miliseconds: _this.state.times.miliseconds,
                        minutes: _this.state.times.minutes += 1
                    }
                });
            }
        };

        _this.handleStart = function () {
            _this.setState({ running: true });
            _this.timerID = setInterval(function () {
                _this.update();
            }, 10);
        };

        _this.handleStop = function () {
            _this.setState({
                running: false
            });
            clearInterval(_this.timerID);
        };

        _this.handleReset = function () {
            _this.setState({
                running: false,
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        };

        _this.handleSave = function () {
            var result = _this.formatTimes(_this.state.times);
            _this.setState({
                results: [result].concat(_toConsumableArray(_this.state.results))
            });
        };

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        };
        _this.timerID = 0;
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "render",
        value: function render() {
            var savedResults = this.state.results.map(function (result, index) {
                return React.createElement(
                    "li",
                    { key: index },
                    result
                );
            });
            var formattedTimes = this.formatTimes(this.state.times);
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "nav",
                    null,
                    React.createElement(
                        "button",
                        { className: "button", type: "button", onClick: this.handleStart },
                        "Start"
                    ),
                    React.createElement(
                        "button",
                        { className: "button", type: "button", onClick: this.handleStop },
                        " Stop "
                    ),
                    React.createElement(
                        "button",
                        { className: "button", type: "button", onClick: this.handleReset },
                        "Reset"
                    ),
                    React.createElement(
                        "button",
                        { className: "button", type: "button", onClick: this.handleSave },
                        "Save"
                    )
                ),
                React.createElement(Display, { times: formattedTimes }),
                React.createElement(LastResults, { results: savedResults })
            );
        }
    }]);

    return Stopwatch;
}(React.Component);