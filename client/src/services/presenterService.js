import http from './httpService';
import config from '../config.json';

const apiEndpoint = '/presenters'; // OR USE THIS IN FUTURE --->	'http://localhost:3000/presenters';

function presenterUrl(id) {
	return `${apiEndpoint}/${id}`;
}
export function getPresenters() {
	return http.get(apiEndpoint); //http://localhost:3000/presenters
}

export function getPresenter(presenterId) {
	return http.get(presenterUrl(presenterId));
}

export function savePresenter(presenter) {
	//console.log('from saveP', presenter);
	if (presenter._id) {
		const body = { ...presenter };
		console.log('BODY', body);
		delete body._id;
		return http.put(presenterUrl(presenter._id), body); //`/presenters/${presenter._id}`, presenter
	}
	//return http.post(apiEndpoint, presenter);
}

export function deletePresenter(presenter) {
	return http.delete(`/presenters/${presenter._id}`); //delete(apiEndpoint + '/' + presenterId)
}
