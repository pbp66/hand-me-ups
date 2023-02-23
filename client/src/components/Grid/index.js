import React from "react";
import { Col, Row, Container, Button } from 'react-bootstrap'

const Grid = ({ colCount, md, children }) => {
    let rowcount = (children.length / colCount +1)
    let index = 0

    const createGrid = () => {
        return (
            createRows()
        )
    }
    const createRows = () => {
        let rows = []
        for (let row = 0; row < rowcount; row++) {
            rows.push(
                <Row className="Row"
                key={row}>
                    {
                        createColumns()
                    }
                </Row>
            )
        }
        return rows
    }
    const createColumns = () => {
        let columns = []
        for (let col = 0; col < colCount; col++) {
            if (index < children.length) {
                columns.push(
                    <Col className="Col" md={md}
                    key={col}>
                        {children[index]}
                    </Col>
                )
            }
            index++
        }
        return columns
    }

    return (
        <Container>
            {createGrid()}
            
        </Container>
    )
}

export default Grid