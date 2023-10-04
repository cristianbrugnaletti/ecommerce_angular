import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { ClienteDTO } from '../cliente/clienteDTO';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.css']
})
export class ModificaClienteComponent {
  @Input() cliente: ClienteDTO | null = null;
  @Input() userOriginale: string | null = null;
  @Output() confermaModifica = new EventEmitter<ClienteDTO>();
  @Output() annullaModifica = new EventEmitter<void>();
  modificaClienteForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.modificaClienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, ]],
      password: ['', [Validators.required, Validators.minLength(8) ]],
      passwordRipetuta: ['', [Validators.required, (control: AbstractControl)=> this.passwordMatchValidator(control) ]],
    });
   }

  salvaModifiche() {
  
    if (this.cliente && this.userOriginale) {
      if(this.modificaClienteForm.valid){
      this.clienteService.modificaCliente(this.userOriginale, this.cliente).subscribe(
        (clienteModificato: ClienteDTO) => {
          // Emetti l'evento confermaModifica con il magazzino modificato
          alert('Cliente modificato con successo!');
          this.confermaModifica.emit(clienteModificato);
        },
        (error) => {
          alert('Errore durante la modifica del cliente');
          console.error('Si è verificato un errore durante la modifica del cliente:', error);
        }
      );
    } else {
      // Form non valido, mostra un messaggio o esegui azioni appropriate
      alert('Il form contiene dati non validi. Per favore, correggi gli errori.');
    }
  }
}

  annulla() {
    this.annullaModifica.emit();
    window.location.href = '/clienti';
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
