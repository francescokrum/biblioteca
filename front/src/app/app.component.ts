import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LivroService } from './services/livro.service';
import { Livro } from './model/livro.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  livros: Livro[] = [];

  identify = '';
  titulo = '';
  autor = '';
  classificacao = '';
  resenha = '';
  dataCadastro = '';

  constructor(private livroService: LivroService){
    this.buscarLivrosCadastrados();
    }

  buscarLivrosCadastrados(){

    this.livroService.buscaLivros().subscribe((res: any) => {
      this.livros = res.data; 
    });
  }

  /*cadastrarLivro() {
    this.livroService.cadastrarLivro({ titulo: this.titulo, autor: this.autor, classificacao: this.classificacao, resenha: this.resenha, dataCadastro: this.dataCadastro })
    .subscribe((res: any) => {
      console.log('Livro inserido com sucesso:', res.data);
      return this.buscarLivrosCadastrados();
    }, (error) => {
        console.error('Erro ao realizar a inserção:', error);
    });
  }*/

  buttonClick(){
    if (!this.titulo || !this.autor || !this.classificacao || !this.resenha || !this.dataCadastro)
      return;

    if (this.identify) {
      this.editarLivro();
      return;
    }

    this.livroService.cadastrarLivro({ titulo: this.titulo, autor: this.autor, classificacao: this.classificacao, resenha: this.resenha, dataCadastro: this.dataCadastro })
      .subscribe(_ => this.buscarLivrosCadastrados())
  }



  preencherCampos(livro: Livro){

    this.identify = livro.identify!.toString();
    this.autor = livro.autor;
    this.titulo = livro.titulo;
    this.classificacao = livro.classificacao!.toString();
    this.resenha = livro.resenha;
    this.dataCadastro = livro.dataCadastro
  }

  /*editarLivro(){

    this.livroService.editarLivro({titulo: this.titulo, autor: this.autor, classificacao: this.classificacao, resenha: this.resenha, dataCadastro: this.dataCadastro})
    .subscribe(_=> this.buscarLivrosCadastrados());

  }*/

  editarLivro(){
    this.livroService.editarLivro({identify: parseInt(this.identify), titulo: this.titulo, autor: this.autor, classificacao: parseInt(this.classificacao), resenha: this.resenha, dataCadastro: this.dataCadastro})
    .subscribe(_ => this.buscarLivrosCadastrados());
  }

  deletarLivro(identify: number){
    this.livroService.deletarLivro(identify).subscribe(_ => this.buscarLivrosCadastrados());
  }
}
