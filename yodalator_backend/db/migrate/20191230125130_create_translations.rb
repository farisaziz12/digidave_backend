class CreateTranslations < ActiveRecord::Migration[6.0]
  def change
    create_table :translations do |t|
      t.string :original_text
      t.string :translated_text
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
