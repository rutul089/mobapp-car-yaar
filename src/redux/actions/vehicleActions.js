import {fetchVehicles} from '../../services';
import types from './types';

export const fetchVehiclesThunk =
  (page = 1, limit = 5) =>
  async dispatch => {
    dispatch({type: types.FETCH_VEHICLES_REQUEST});

    try {
      const response = await fetchVehicles(page, limit);
      dispatch({
        type: types.FETCH_VEHICLES_SUCCESS,
        payload: {
          data: response.data,
          pagination: response.pagination,
          page, // Pass the current page for correct pagination handling
        },
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_VEHICLES_FAILURE,
        payload: error.message || 'Something went wrong',
      });
    }
  };

// pagination example

//   import React, { Component } from 'react';
// import { FlatList, View, Text, Button, ActivityIndicator } from 'react-native';
// import { connect } from 'react-redux';
// import { fetchVehicles } from './redux/actions/vehicleActions'; // Adjust path accordingly

// class VehicleList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//     };
//   }

//   componentDidMount() {
//     // Fetch the first page when the component mounts
//     this.loadVehicles(1);
//   }

//   // Trigger load more vehicles
//   loadVehicles = (page) => {
//     const { fetchVehicles } = this.props;

//     this.setState({ loading: true });
//     fetchVehicles(page)
//       .finally(() => {
//         this.setState({ loading: false });
//       });
//   };

//   handleLoadMore = () => {
//     const { pagination } = this.props.vehicles.allVehicles;
//     const currentPage = pagination.page;

//     if (currentPage < pagination.totalPages) {
//       // Load next page if available
//       this.loadVehicles(currentPage + 1);
//     }
//   };

//   renderFooter = () => {
//     if (this.state.loading) {
//       return (
//         <View style={{ padding: 10 }}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }
//     return null;
//   };

//   render() {
//     const { vehicles } = this.props;
//     const { data, pagination } = vehicles.allVehicles;

//     return (
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id.toString()} // Adjust as per your data structure
//           renderItem={({ item }) => (
//             <View style={{ padding: 10 }}>
//               <Text>{item.businessName}</Text>
//             </View>
//           )}
//           ListFooterComponent={this.renderFooter}
//           onEndReached={this.handleLoadMore} // Trigger load more on scroll end
//           onEndReachedThreshold={0.5} // Adjust threshold for when the user is near the end of the list
//         />
//         {pagination.page < pagination.totalPages && !this.state.loading && (
//           <Button title="Load More" onPress={this.handleLoadMore} />
//         )}
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   vehicles: state.vehicles, // Assuming the vehicles state is in this location
// });

// const mapDispatchToProps = {
//   fetchVehicles,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);
