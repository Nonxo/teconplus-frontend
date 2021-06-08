import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "textTransform",
})
export class TextTransformPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return;
    }
    let replaceString = value.replace("_", " ").toLowerCase();
    return (
      replaceString.charAt(0).toUpperCase() +
      replaceString.substring(1, replaceString.length)
    );
  }
}
