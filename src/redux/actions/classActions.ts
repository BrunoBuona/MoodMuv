//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'
import axios from 'axios';

//INTERFACES
import classDTO from '../../types/classDTO'

const classActions = {
    
	fetchClass: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/activity/' + id,
			})

			dispatch({type:'fetchActivity', payload:ans.data.data})

			return ans.data.data
	        }

	}
}

export default classActions
