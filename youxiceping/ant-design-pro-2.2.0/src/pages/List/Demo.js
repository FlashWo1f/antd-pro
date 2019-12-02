import React, { Component } from 'react';
import { Card } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

class Demo extends Component {
    state = {}

    render() {
        return (
            <PageHeaderWrapper>
                <Card>
                    <div>
                        Strong
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default Demo;