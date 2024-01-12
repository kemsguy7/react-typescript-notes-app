import exp from "constants";
import { Note } from "../models/notes";
import { User } from "../models/user";
/********************************************************* THIS SCRIPT HANDLES NOTE CRUD OPERATION FROM THE FRONTEND (BROWSER) */


/********************************************************SIGNUP LOGIN FUNCITONALITIS */
export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" }); //proxy url defined in package.json to prevent CORS error
    return response.json(); //get the user from the api
}


export interface signUpCredentials {  //defining field for user creation
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: signUpCredentials): Promise<User> { //creating new user 
    const response = await fetchData("/api/users/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface loginCredentials {  //defining field for user login 
    username: string,
    password: string,
}

export async function login(credentials: loginCredentials): Promise<User> { //login user 

    const response = await fetchData("/api/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(credentials),
    });
    return response.json();
}


export async function logout(): Promise<void> { //logout user 
    await fetchData("/api/users/logout", { method: "POST" }); 
}






/***************************************************************************** END SIGNUP FUNCTIONALITIES  */



/***************************************************************************** NOTE FUNCTIONALITIES  */
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init); 
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}


export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes", { method: "GET" }); //proxy url defined in package.json to prevent CORS error 
    return response.json(); //get the notes from the api 
}

export interface NoteInput {  //defining field for note creation
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> { //creating new notes 
    const response = await fetchData("/api/notes",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(note),
    });
    return response.json();
}


//updating notes 
export async function updateNote (noteId:string,  note:NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    return response.json()
}

//Delete notes
export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, { method: "DELETE"}); 
}

