import { Component } from '@angular/core';
import { ClienteDTO } from '../cliente/clienteDTO';
import { ClienteService } from '../cliente/cliente.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-aggiungi-cliente',
  templateUrl: './aggiungi-cliente.component.html',
  styleUrls: ['./aggiungi-cliente.component.css'],
})
export class AggiungiClienteComponent {
  cliente: ClienteDTO = new ClienteDTO();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  clienteForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      username: ['', [Validators.required, ]],
      password: ['', [Validators.required, Validators.minLength(8) ]],
      passwordRipetuta: ['', [Validators.required, (control: AbstractControl)=> this.passwordMatchValidator(control) ]],
    });
  }

  aggiungiCliente() {
    if (this.clienteForm.valid) {
      // Il form è valido, procedi con l'invio dei dati al server
      this.cliente = this.clienteForm.value; // Ottieni i dati dal form
      this.clienteService.aggiungiCliente(this.cliente).subscribe(
        (response: any) => {
          console.log('Risposta del server:', response);
          if (response && response.username) {
            // La risposta contiene dati validi, quindi considerala un successo
            alert("Cliente aggiunto con successo!");
            this.router.navigate(['/clienti']);
          } else {
            // La risposta contiene un errore o dati non validi
            alert("Errore durante l'aggiunta del cliente!");
            console.error('Risposta del server sconosciuta:', response);
          }
        },
        (error) => {
          alert("Errore durante l'aggiunta del cliente!");
          console.error('Si è verificato un errore durante l\'aggiunta del cliente:', error);
        }
      );
    } else {
      alert("Form invalido compliare correttamente i campi!")
      console.log('Il form non è valido. Controlla i campi.');
    }
  }

  customEmailValidator(control: any) {
    const email = control.value;

    if (email && email.indexOf('@') === -1) {
      // Se l'email non contiene "@" aggiungi un errore personalizzato
      return { invalidEmail: true,  message: 'Email non valida!' };
    }

    // Se l'email è valida, restituisci null (nessun errore)
    return null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password')?.value;
    const passwordRipetuta = control.root.get('passwordRipetuta')?.value;
  
    return password === passwordRipetuta ? null : { passwordMismatch: 'La password deve essere uguale.' };
  }
  
}



