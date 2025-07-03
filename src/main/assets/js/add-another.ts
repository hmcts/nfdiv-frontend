import { Component } from 'govuk-frontend';

export class AddAnother extends Component {
  $root: HTMLElement;

  constructor($root: Element | null) {
    super($root);
    if (!$root || !($root instanceof HTMLElement)) {
      throw new Error('AddAnother must be initialized with a valid HTMLElement.');
    }
    this.$root = $root;

    this.$root?.addEventListener('click', this.onRemoveButtonClick.bind(this));
    this.$root?.addEventListener('click', this.onAddButtonClick.bind(this));

    const $buttons = this.$root?.querySelectorAll('.moj-add-another__add-button, .moj-add-another__remove-button');

    $buttons?.forEach($button => {
      if ($button instanceof HTMLButtonElement) {
        $button.type = 'button';
      }
    });
  }

  onAddButtonClick(event: MouseEvent): void {
    const $button = event.target as HTMLElement | null;

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains('moj-add-another__add-button')
    ) {
      return;
    }

    const $items = this.getItems();
    const $item = this.getNewItem();

    if (!$item) {
      return;
    }

    this.updateAttributes($item, $items.length);
    this.resetItem($item);

    const $firstItem = $items[0];
    if (!this.hasRemoveButton($firstItem)) {
      this.createRemoveButton($firstItem);
    }

    $items[$items.length - 1].after($item);

    const $input = $item.querySelector('input, textarea, select');
    if ($input instanceof HTMLElement) {
      ($input as HTMLInputElement).focus();
    }
  }

  hasRemoveButton($item: HTMLElement): boolean {
    return $item.querySelectorAll('.moj-add-another__remove-button').length > 0;
  }

  getItems(): HTMLElement[] {
    if (!this.$root) {
      return [];
    }

    const $items = Array.from(this.$root.querySelectorAll('.moj-add-another__item'));

    return $items.filter((item): item is HTMLElement => item instanceof HTMLElement);
  }

  getNewItem(): HTMLElement | undefined {
    const $items = this.getItems();
    const $item = $items[0]?.cloneNode(true);

    if (!$item || !($item instanceof HTMLElement)) {
      return;
    }

    if (!this.hasRemoveButton($item)) {
      this.createRemoveButton($item);
    }

    return $item;
  }

  updateAttributes($item: HTMLElement, index: number): void {
    $item.querySelectorAll('[data-name]').forEach($input => {
      if (!this.isValidInputElement($input)) {
        return;
      }

      const name = $input.getAttribute('data-name') || '';
      const id = $input.getAttribute('data-id') || '';
      const originalId = $input.id;

      $input.name = name.replace(/%index%/, `${index}`);
      $input.id = id.replace(/%index%/, `${index}`);

      const $label =
        $input.parentElement?.querySelector('label') ||
        $input.closest('label') ||
        $item.querySelector(`label[for="${originalId}"]`);

      if ($label instanceof HTMLLabelElement) {
        $label.htmlFor = $input.id;
      }
    });
  }

  createRemoveButton($item: HTMLElement): void {
    const $button = document.createElement('button');
    $button.type = 'button';

    $button.classList.add('govuk-button', 'govuk-button--secondary', 'moj-add-another__remove-button');

    $button.textContent = 'Remove';

    $item.append($button);
  }

  resetItem($item: HTMLElement): void {
    $item.querySelectorAll('[data-name], [data-id]').forEach($input => {
      if (!this.isValidInputElement($input)) {
        return;
      }

      if ($input instanceof HTMLSelectElement) {
        $input.selectedIndex = -1;
        $input.value = '';
      } else if ($input instanceof HTMLTextAreaElement) {
        $input.value = '';
      } else {
        switch ($input.type) {
          case 'checkbox':
          case 'radio':
            $input.checked = false;
            break;
          default:
            $input.value = '';
        }
      }
    });
  }

  onRemoveButtonClick(event: MouseEvent): void {
    const $button = event.target as HTMLElement | null;

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains('moj-add-another__remove-button')
    ) {
      return;
    }

    const $item = $button.closest('.moj-add-another__item') as HTMLElement | null;
    $item?.remove();

    const $items = this.getItems();

    if ($items.length === 1) {
      const $removeButton = $items[0].querySelector('.moj-add-another__remove-button');
      $removeButton?.remove();
    }

    $items.forEach(($item, index) => {
      this.updateAttributes($item, index);
    });

    this.focusHeading();
  }

  focusHeading(): void {
    const $heading = this.$root?.querySelector('.moj-add-another__heading');
    if ($heading instanceof HTMLElement) {
      $heading.focus();
    }
  }

  isValidInputElement($input: Element): $input is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
    return (
      $input instanceof HTMLInputElement || $input instanceof HTMLSelectElement || $input instanceof HTMLTextAreaElement
    );
  }

  static moduleName = 'moj-add-another';
}
