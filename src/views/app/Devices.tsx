import React from 'react'
import { Table, Button, Card, CardBody } from 'reactstrap';

export const Devices = () => {
    return (
        <div className="content" style={{overflow : 'hidden'}}>
            <Card>
                <CardBody>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>DeviceId</th>
                                <th>DeviceName</th>
                                <th className="text-center">Username</th>
                                <th className="text-right">Password</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Andrew Mike</td>
                                <td>Develop</td>
                                <td className="text-center">2013</td>
                                <td className="text-right">€ 99,225</td>
                                <td className="text-right">
                                    <Button className="btn-icon" color="info" size="sm">
                                        <i className="fa fa-user"></i>
                                    </Button>{` `}
                                    <Button className="btn-icon" color="success" size="sm">
                                        <i className="fa fa-edit"></i>
                                    </Button>{` `}
                                    <Button className="btn-icon" color="danger" size="sm">
                                        <i className="fa fa-times" />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>


                </CardBody>
            </Card>
        </div>
    )
}
