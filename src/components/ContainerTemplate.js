// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import {Route, Link} from 'react-router-dom'
// import { Container } from 'react-bootstrap';

// const ContainerName = ({reducerName}) => (  
//   <Container>
//     {reducerName.map((el, i) => {
//       return (
//         <div key={i}>
//           <div>
//             { ? {} : ''}
//             { && ''}
//           </div>
//           <hr/>
//         </div>
//       )
//     })}
//   </Container>
// )

// const mapStateToProps = state => ({
//   reducerName: state.reducerName,
// })

// const mapDispatchToProps = dispatch => ({
//   propName: () => dispatch(actionNamw()),
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ContainerName)