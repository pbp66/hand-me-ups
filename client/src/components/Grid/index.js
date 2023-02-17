import React from "react";
import { Col, Row, Container } from 'react-bootstrap'

const Grid = ({ colCount, md, children }) => {
    let rowcount = (children.length / colCount + 1)
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
                <Row className="='Row">
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
        for (let col = 0; col < rowcount; col++) {
            if (index < children.length) {
                columns.push(
                    <Col className="Col">
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