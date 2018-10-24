import * as React from 'react';

interface Members {
    id: number,
    name: string
}

interface Props {

}

interface State {
    members: Members[]
}

class MemberTest extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            members: []
        }
    }

    componentDidMount() {
        fetch('/api/members')
            .then(res => res.json())
            .then(members => this.setState({members}, () => console.log('fetched', members)))
    }

    render() {
        return <div>
            <h2>Project Members</h2>
            <div>{this.state.members.map(i => i.name)}</div>
        </div>
    }
}

export default MemberTest