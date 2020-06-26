$(document).ready(function(){
$('#search').on('keyup', function(e){
let User = e.target.value;
// Make request to Github
$.ajax({
url:'https://api.github.com/users/'+User,
data:{
client_id:'a61fef0fb643adf02f01',
client_secret:'ebfb2d7018b10028146637c4048a0853d55275fd'
}
}).done(function(user){
$.ajax({
url:'https://api.github.com/users/'+User+'/repos',
data:{
client_id:'a61fef0fb643adf02f01',
client_secret:'ebfb2d7018b10028146637c4048a0853d55275fd',
sort: 'created: asc',
per_page: 5
}
}).done(function(repos){
$.each(repos, function(index, repo){
$('#repos').append(`
<div class="card border-info m-2 p-3">
<div class="row">
	<div class="col-md-7">
		<strong>${repo.name}</strong>: ${repo.description}
	</div>
	<div class="col-md-3">
		<span class="btn btn-sm btn-dark">Forks: ${repo.forks_count}</span>
		<span class="btn btn-sm btn-info">Watchers: ${repo.watchers_count}</span>
		<span class="btn btn-sm btn-warning">Stars: ${repo.stargazers_count}</span>
	</div>
	<div class="col-md-2">
		<a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
	</div>
</div>
</div>
`);
});
});
$('#profile').html(`
<div class="card border-info mb-3 mt-3" style="max-width: 100rem;">
<div class="card-header flex"><h3><strong>USER_NAME::</strong> ${user.name}</h3></div>
<div class="card-body">
	<div class="row">
		<div class="col-md-3">
			<img class="img-thumbnail avatar" src="${user.avatar_url}">
			<a target="_blank" class="btn btn-info btn-block mt-2" href="${user.html_url}">See Profile</a>
		</div>
		<div class="col-md-9">
			<span class="btn btn-dark">Public Repos: ${user.public_repos}</span>
			<span class="btn btn-warning">Public Gists: ${user.public_gists}</span>
			<span class="btn btn-success">Followers: ${user.followers}</span>
			<span class="btn btn-info">Following: ${user.following}</span>
			<br><br>
			<ul class="list-group">
				<li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
				<li class="list-group-item"><strong>Website/blog:</strong> <a href="${user.blog}" target="_blank" class="text-info link">${user.blog}</a></li>
				<li class="list-group-item"><strong>Twitter Username:</strong> ${user.twitter_username}</li>
				<li class="list-group-item"><strong>Email ID:</strong> ${user.email}</li>
				<li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
				<li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>
				<li class="list-group-item"><strong>User Bio:</strong> ${user.bio}</li>
			</ul>
		</div>
	</div>
</div>
</div>
<h3 class="page-header text-center m-4">-Latest Repositories-</h3>
<hr>
<div id="repos"></div>
`);
});
});
});