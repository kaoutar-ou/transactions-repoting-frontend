import "./style.css";
import * as constants from "../../services/constants"

import React from 'react'

function TransactionSection(props) {

  return (
    <div className="infos-container">
                <div className="infos-header p-3">{props.title}</div>
                <div className="infos-content row p-3">
                    {
                        Object.entries(props.data).map((value, index) => {
                            return (
                                <div className="col col-12 col-sm-5 col-lg-3 m-3">
                                    <div className="info-heading">{value[0]}</div>
                                    <div className="info-description">{value[1]}</div>
                                </div>
                            )
                        })
                    }
                    {/* <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div> */}
                </div>
            </div>
  )
}

export default TransactionSection