package main 

import (
	"net/http"
	"html/template"
	"fmt"
)

var Data struct {
	Dialogue []string
}

func main() {
	initBot()
	for !checkChannelId(){}

	fmt.Println("Server online")

	http.HandleFunc("/", Handler)
	http.ListenAndServe(":8080", nil)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./static/index.html"))
	
	switch r.Method {
	case "GET":
		fmt.Println("GET")
	case "POST": 
		if err := r.ParseForm(); err != nil {
			return
		}
	}
	
	mail := r.Form.Get("mail")
	question := r.Form.Get("question")
	if mail != "" && question != "" {
		startThread(mail)
		Data.Dialogue = append(Data.Dialogue, "You : "+question)
	}
	
	switch messageThread(question) {
	case true:
		fmt.Println("sent")
	case false:
		fmt.Println("not sent")
	}	

	tmpl.Execute(w, Data)
}

func transferData(message string) {
	Data.Dialogue = append(Data.Dialogue, "Moderator : "+message)
}
