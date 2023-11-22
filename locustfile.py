from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 2)
    base_url = "https://runtime-terrors-sdp.web.app"  # Set your base URL here
    self = base_url
    def on_start(self):
        # This function is called when a Locust user starts the test
        # You can perform setup actions here if needed, like logging in

        # Simulate opening the student pop-up and entering the student number
        self.open_student_popup()

    def open_student_popup(self):
        # Simulate opening the student pop-up
        response = self.client.get("/")
        # Extract any necessary information from the response

        # Now, simulate entering the student number and saving
        self.enter_student_number()

    def enter_student_number(self):
        # Simulate entering the student number
        response = self.client.post("/#", data={"studentNumber": "123456"})
        # Add any necessary validation based on the response

    @task
    def home_page(self):
        self.client.get("/")

    @task
    def student_quiz_page(self):
        # Since we've already simulated the login process in on_start, just visit the student quiz page here
        self.client.get("/Quiz/student.html")

    @task
    def interactive_ui_page(self):
        self.client.get("/Interactive_UI/push.html")
