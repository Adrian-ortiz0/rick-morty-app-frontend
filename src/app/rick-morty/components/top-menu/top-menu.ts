import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  imports: [],
  standalone: true,
  templateUrl: './top-menu.html',
})
export class TopMenu { 

  debounceTime = input(500);

  searchByName = output<string>();
  statusChange = output<string>();
  speciesChange = output<string>();

  searchValue = linkedSignal<string>(() => '');

  debounceEffect = effect((onCleanup) => {
    const value = this.searchValue();

    const t = setTimeout(() => {
      this.searchByName.emit(value.trim());
    }, this.debounceTime());

    onCleanup(() => clearTimeout(t));
  });
}
