import { Component, effect, input, linkedSignal, output } from '@angular/core';

let initialized = false;

@Component({
  selector: 'app-top-menu',
  imports: [],
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

    if (!initialized) {
      initialized = true;
      return;
    }

    const t = setTimeout(() => {
      this.searchByName.emit(value.trim());
    }, this.debounceTime());

    onCleanup(() => clearTimeout(t));
  });
}
