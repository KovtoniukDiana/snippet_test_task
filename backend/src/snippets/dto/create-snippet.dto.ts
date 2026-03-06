import { IsString, IsNotEmpty, IsArray, IsOptional, IsEnum } from "class-validator";

export class CreateSnippetDto {

    @IsString({message: "Поле має бути рядком"})
    @IsNotEmpty({message: "Зголовок обов'язковий"})
    title: string

    @IsString({message: "Поле має бути рядком"})
    @IsNotEmpty({message: "Контент не може бути порожнім"})
    content: string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags: string[]

    @IsEnum(['link', 'note', 'command'], { message: 'Тип має бути: link, note або command' })
    type: string;
}
