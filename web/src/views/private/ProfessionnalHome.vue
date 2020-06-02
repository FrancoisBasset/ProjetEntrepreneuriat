<template>

</template>

<script>
export default {
	name: 'ProfessionnalHome',
	created: function() {
		fetch('http://localhost/accounts').then(function(response) {
			response.json().then(function(json) {
				console.log(json.response);
			});
		});
	}

			
}
</script>