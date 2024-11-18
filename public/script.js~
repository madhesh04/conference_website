$(document).ready(function() {
    $('#feedback-form').on('submit', function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();

        $.ajax({
            url: '/send-feedback',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: name,
                email: email,
                message: message
            }),
            success: function(response) {
                alert('Feedback sent successfully!');
                $('#feedback-form')[0].reset();
            },
            error: function(error) {
                alert('Error sending feedback. Please try again later.');
            }
        });
    });
});
