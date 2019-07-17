
class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running : false,
            times : {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results : [] 
        }
        this.timerID = 0;
    }

    formatTimes = (times) => {
        const pad0 = (value) =>{
            let result = value.toString();
                if (result.length < 2) {
                        result = '0' + result;
                    }
                    return result;
        }
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    update = () => {
        this.setState({ 
            times: {
                miliseconds : this.state.times.miliseconds += 1,
                seconds : this.state.times.seconds,
                minutes: this.state.times.minutes
            }
        })
        if (this.state.times.miliseconds >= 100) {
        this.setState({
            times: {
                seconds : this.state.times.seconds += 1,
                miliseconds : 0,
                minutes: this.state.times.minutes
            }
        })
        }
        if (this.state.times.seconds >= 60) {
        this.setState({
            times: {
                seconds: 0,
                miliseconds: this.state.times.miliseconds,
                minutes : this.state.times.minutes +=1
            }
        })
        }
    }
    handleStart = () => {
        this.setState({ running: true });
        this.timerID = setInterval(() =>{
            this.update();
        }, 10);          
    }
    handleStop = () => {
        this.setState({
            running : false,
        })
        clearInterval(this.timerID);
    }
    handleReset = () => {
        this.setState({
            running: false,
            times : {
                minutes: 0,
                seconds: 0,
                miliseconds: 0  
            }
        })
    }
    handleSave = () => {
        const result = this.formatTimes(this.state.times);
        this.setState({
            results: [result, ...this.state.results ]
        })
    }
    render(){
        const savedResults = this.state.results.map((result, index)=>{
            return <li key={index}>{result}</li>
        })
        const formattedTimes = this.formatTimes(this.state.times);
        return(
             
            <div>
                <nav>
                    <button className="button" type="button" onClick={ this.handleStart }>Start</button>
                    <button className="button" type="button" onClick={ this.handleStop } > Stop </button>
                    <button className="button" type="button" onClick={ this.handleReset }>Reset</button>
                    <button className="button" type="button" onClick={ this.handleSave }>Save</button>
                </nav>
                < Display times={formattedTimes} />
                < LastResults results={savedResults} />
            </div>
        );
    }
}